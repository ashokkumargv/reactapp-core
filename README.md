# reactapp-core

DB: 

EF: Command for initial create DB
dotnet ef migrations add  initial --project "..\reactapp-core\DataAccessLayer\DataAccessLayer.csproj"
dotnet ef migrations update --project "..\reactapp-core\DataAccessLayer\DataAccessLayer.csproj"
or 
dotnet ef migrations add  Web --project "..\reactapp-core\DataAccessLayer\DataAccessLayer.csproj"
dotnet ef migrations update --project "..\reactapp-core\DataAccessLayer\DataAccessLayer.csproj"