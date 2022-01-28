FROM mcr.microsoft.com/dotnet/core/sdk:5.0 AS builder
WORKDIR /app
COPY . .
RUN dotnet publish Tmt.csproj -c Release -o /out

FROM mcr.microsoft.com/dotnet/core/aspnet:5.0
ENV ASPNETCORE_URLS http://+:5000
WORKDIR /app
COPY --from=builder /out .
ENTRYPOINT ["dotnet", "Tmt.dll"]
