terraform {
  required_version = ">= 1.0.0" # Ensure that the Terraform version is 1.0.0 or higher

  required_providers {
    aws = {
      source = "hashicorp/aws" # Specify the source of the AWS provider
      version = "6.2.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# --- Networking ---
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "${var.project_name}-${var.env}-vpc"
  }
}

resource "aws_subnet" "public_a" {
  vpc_id = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
  availability_zone = "${var.aws_region}a"
  tags = {
    Name = "${var.project_name}-${var.env}-public-a"
  }
}

resource "aws_subnet" "public_b" {
  vpc_id = aws_vpc.main.id
  cidr_block = "10.0.2.0/24"
  availability_zone = "${var.aws_region}b"
  tags = {
    Name = "${var.project_name}-${var.env}-public-b"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  tags = {
    Name = "${var.project_name}-${var.env}-igw"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }
  tags = {
    Name = "${var.project_name}-${var.env}-public-rt"
  }
}

resource "aws_route_table_association" "public_a" {
  subnet_id      = aws_subnet.public_a.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public_b" {
  subnet_id      = aws_subnet.public_b.id
  route_table_id = aws_route_table.public.id
}

# --- Security Groups ---
resource "aws_security_group" "load_balancer" {
  name = "${var.project_name}-${var.env}-lb-sg"
  description = "Allow HTTP traffic to load balancer"
  vpc_id = aws_vpc.main.id
  ingress {
    protocol = "tcp"
    from_port = 80
    to_port = 80
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress{
    protocol = "-1"
    from_port = 0
    to_port = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "ecs_service" {
  name = "${var.project_name}-${var.env}-ecs-sg"
  description = "Allow traffic from LB to ECS tasks"
  vpc_id = aws_vpc.main.id
  ingress {
    protocol = "tcp"
    from_port = 8080
    to_port = 8080
    security_groups = [aws_security_group.load_balancer.id]
  }
  egress {
    protocol = "-1"
    from_port = 0
    to_port = 0
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "rds" {
  name = "${var.project_name}-${var.env}-rds-sg"
  description = "Allow traffic from ECS to RDS"
  vpc_id = aws_vpc.main.id
  ingress {
    protocol = "tcp"
    from_port = 5432
    to_port = 5432
    security_groups = [aws_security_group.ecs_service.id]
  }
}

# --- DATABASE (RDS) & SECRETS (SSM) ---
resource "aws_ssm_parameter" "db_password" {
  name = "/${var.project_name}-${var.env}-rds-subnet"
  type = "SecureString"
  value = "var.db.password"
}

resource "aws_db_subnet_group" "rds" {
  name = "${var.project_name}-${var.env}-rds-subnet-group"
  subnet_ids = [
    aws_subnet.public_a.id,
    aws_subnet.public_b.id,
  ]
}

resource "aws_db_instance" "main" {
  identifier = "${var.project_name}-${var.env}-rds-subnet-group"
  instance_class = "db.t2.micro"
  engine = "postgres"
  engine_version = "15"
  allocated_storage = 20
  username = "postgres"
  password = var.db_password
  db_subnet_group_name = aws_db_subnet_group.rds.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  skip_final_snapshot = true
}

# --- ECR (Container Registry) ---
resource "aws_ecr_repository" "backend" {
  name = "${var.project_name}-backend"
}

# --- LOAD BALANCER (ALB) ---
resource "aws_lb" "main" {
  name = "${var.project_name}-${var.env}-lb"
  internal = false
  load_balancer_type = "application"
  security_groups = [aws_security_group.load_balancer.id]
  subnets = [
    aws_subnet.public_a.id,
    aws_subnet.public_b.id,
  ]
}

# --- ECS FARGATE ---
resource "aws_ecs_cluster" "main" {
  name = "${var.project_name}-${var.env}-cluster"
}

resource "aws_iam_role" "ecs_task_execution_role" {
  name = "${var.project_name}-${var.env}-ecs-task-execution-role"
  assume_role_policy = jsondecode({
    Version = "" # TODO: Update
  })
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
  policy_arn         = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
  role               = aws_iam_role.ecs_task_execution_role.name
}

resource "aws_ecs_task_definition" "backend" {
  family                = "${var.project_name}-backend-task"
  network_mode = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu = "256"
  memory = "512"
  execution_role_arn = aws_iam_role.ecs_task_execution_role.arn
  container_definitions = jsonencode([{
    name = "${var.project_name}-backend"
    image = var.backend_image_uri
    essential = true
    portMappings = [{
      containerPort = 8080
      hostPort = 8080
    }]
    environment = [
      { name = "ASPNETCORE_ENVIRONMENT", value = "Test" },
      { name = "DB_HOST", value = aws_db_instance.main.address },
      { name = "DB_NAME", value = "postgres" }, #TODO: fill with db name
      { name = "DB_USER", value = "postgres" }
    ]
    secrets = [
      { name = "DB_PASSWORD", valueFrom = aws_ssm_parameter.db_password.arn }
    ]
  }])
}

resource "aws_ecs_service" "backend" {
  name = "${var.project_name}-backend-service"
  cluster = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.backend.arn
  desired_count = 1
  launch_type = "FARGATE"
  depends_on = aws_iam_role.ecs_task_execution_role 
  
  network_configuration {
    subnets = [
      aws_subnet.public_a.id,
      aws_subnet.public_b.id,
    ]
    security_groups = [aws_security_group.ecs_service.id]
    assign_public_ip = true
  }
  
  load_balancer {
    target_group_arn = aws_lb.main.arn
    container_name = "${var.project_name}-backend"
    container_port = 8080
  }
}