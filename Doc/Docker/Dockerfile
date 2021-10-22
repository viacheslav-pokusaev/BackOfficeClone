FROM baseimage AS base
WORKDIR /app
EXPOSE 80
WORKDIR /src
 
RUN git clone http://a.volfson:imjtdspq@212.3.101.118:7990/scm/bac/backoffice.git
 
WORKDIR /src/backoffice
 
WORKDIR /src/backoffice/Application
 
RUN npm install
 
RUN ng build --prod --output-hashing=none
 
RUN dotnet publish -c Release Application.csproj -o /app
 
WORKDIR /app

RUN mkdir -p /app/logs
 
WORKDIR /app

ENTRYPOINT ["dotnet", "Application.dll"]
