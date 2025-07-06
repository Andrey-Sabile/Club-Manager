FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
COPY ["Directory.Build.props", "./"]
COPY ["Directory.Packages.props", "./"]
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["src.sln", "./"]
COPY ["Application/Application.csproj", "Application/"]
COPY ["Domain/Domain.csproj", "Domain/"]
COPY ["Infrastructure/Infrastructure.csproj", "Infrastructure/"]
COPY ["Web/Web.csproj", "Web/"]
RUN dotnet restore "./Application/Application.csproj"
RUN dotnet restore "./Domain/Domain.csproj"
RUN dotnet restore "./Infrastructure/Infrastructure.csproj"
RUN dotnet restore "./Web/Web.csproj"
COPY . .
WORKDIR "/src/Web"
RUN dotnet build "./Web.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Web.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM node AS nodebuilder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY ["Web/ClientApp/package.json", "/usr/src/app/package.json"]
RUN npm install
RUN npm install -g @angular/cli@18.0.1 --unsafe

COPY ["Web/ClientApp/.", "/usr/src/app"]

RUN npm run build

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
RUN mkdir -p /app/ClientApp/dist
COPY --from=nodebuilder /usr/src/app/dist/. /app/ClientApp/dist/
ENTRYPOINT ["dotnet", "Web.dll"]