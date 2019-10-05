FROM mcr.microsoft.com/dotnet/core/sdk:3.0
LABEL maintainer "frank@pommerening-online.de"
ENV REFRESHED_AT 2019-07-15


EXPOSE 5000

COPY WebApp /WebApp
WORKDIR /WebApp
RUN dotnet restore && dotnet build
ENTRYPOINT [ "dotnet", "watch", "run", "--no-restore", "--urls", "http://0.0.0.0:5000"]
