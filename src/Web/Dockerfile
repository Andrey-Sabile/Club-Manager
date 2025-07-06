FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
ENV ASPNETCORE_URLS=http://+:5000
WORKDIR /app
EXPOSE 5000
#EXPOSE 5001

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
COPY ["Directory.Build.props", "./"]
COPY ["Directory.Packages.props", "./"]
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt install -y nodejs
WORKDIR /src
COPY ["src/Web/Web.csproj", "src/Web/"]
COPY ["src/Application/Application.csproj", "src/Application/"]
COPY ["src/Domain/Domain.csproj", "src/Domain/"]
COPY ["src/Infrastructure/Infrastructure.csproj", "src/Infrastructure/"]
RUN dotnet restore "src/Web/Web.csproj"
COPY . .
WORKDIR "/src/src/Web"
RUN dotnet build "Web.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Web.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Club_Manager.Web.dll"]