variable "aws_region" {
  type = string                   
  default = "ap-southeast-2"         
}

variable "env" {
  type = string
  default = "test"
  description = "Either test or prod"
}

variable "backend_image_uri" {
  type = string
  description = "ECR Image URI"
}

variable "project_name" {
  type = string
  default = "club-manager"
}

variable "db_password" {
  type = string
  sensitive = true
}
