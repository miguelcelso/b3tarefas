# Acesse https://aka.ms/customizecontainer para saber como personalizar seu contêiner de depuração e como o Visual Studio usa este Dockerfile para criar suas imagens para uma depuração mais rápida.

# Esta fase é usada durante a execução no VS no modo rápido (Padrão para a configuração de Depuração)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

ENV ASPNETCORE_URLS=http://+:8080;http://+:8081;
ENV ASPNETCORE_ENVIRONMENT=Development

# Esta fase é usada para compilar o projeto de serviço
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Development
WORKDIR /src
COPY ["TarefasWeb/TarefasWeb/Api.csproj", "TarefasWeb/"]
COPY ["TarefasWeb/InfraInversionControl/InfraInversionControl.csproj", "InfraInversionControl/"]
COPY ["TarefasWeb/Domain/Domain.csproj", "Domain/"]
COPY ["TarefasWeb/Infra/Infra.csproj", "Infra/"]
COPY ["TarefasWeb/Service/Service.csproj", "Service/"]
RUN dotnet restore "./TarefasWeb/Api.csproj"
COPY . .
WORKDIR "/src/TarefasWeb"
RUN dotnet build "./TarefasWeb/Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Esta fase é usada para publicar o projeto de serviço a ser copiado para a fase final
FROM build AS publish
ARG BUILD_CONFIGURATION=Development
RUN dotnet publish "./TarefasWeb/Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=true

# Esta fase é usada na produção ou quando executada no VS no modo normal (padrão quando não está usando a configuração de Depuração)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Api.dll"]