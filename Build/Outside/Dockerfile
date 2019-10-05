FROM mcr.microsoft.com/dotnet/core/aspnet:3.0
LABEL maintainer "frank@pommerening-online.de"
ENV REFRESHED_AT 2019-10-05
WORKDIR /app

ENV ASPNETCORE_URLS http://0.0.0.0:5000
EXPOSE 5000
WORKDIR /app/
COPY publish ./
ENTRYPOINT ["dotnet", "BuildOutside.dll"]
