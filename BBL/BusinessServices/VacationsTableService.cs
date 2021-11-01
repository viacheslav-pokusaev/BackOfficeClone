using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.EntitiesModels.Models;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Application.BBL.BusinessServices
{
    public class VacationsTableService : IVacationsTableService
    {
        static readonly string[] Scopes = { SheetsService.Scope.Spreadsheets };
        static readonly string ApplicationName = "Dot Tutorials";
        static readonly string sheet = "October'21";
        static readonly string SpreadsheetId = "18XJpskb88AAKQEBKE0C49z43NQfwKJR5JEMTgE-EYSc";

        static SheetsService service;
        public List<VacationsTableModel> GetAllVacationsFromSheet()
        {
            GoogleCredential credential;
            //Reading Credentials File...
            using (var stream = new FileStream("inlaid-crowbar-330810-0492784c4579.json", FileMode.Open, FileAccess.Read))
            {
                credential = GoogleCredential.FromStream(stream).CreateScoped(Scopes);
            }

            // Creating Google Sheets API service...
            service = new SheetsService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = ApplicationName,
            });

            // Specifying Column Range for reading...
            var range = $"{sheet}!A:AJ";
            SpreadsheetsResource.ValuesResource.GetRequest request =
                    service.Spreadsheets.Values.Get(SpreadsheetId, range);

            // Ecexuting Read Operation...
            var response = request.Execute();
            // Getting all records from Column A to E...
            IList<IList<object>> sheetValues = response.Values;

            var readSheetResponce = new List<VacationsTableModel>();

            int rowIndex = 0;
            int columnIndex = 0;

            foreach(var sheetRow in sheetValues)
            {
                foreach(var sheetValue in sheetRow)
                {
                    readSheetResponce.Add(new VacationsTableModel() { RowIndex = rowIndex, ColumnIndex = columnIndex, Data = sheetValue });
                    columnIndex++;
                }
                columnIndex = 0;
                rowIndex++;
            }
            return readSheetResponce;
        }

        public bool UpdateVacationOnSheet(VacationsTableModel vacation)
        {
            throw new NotImplementedException();
        }
    }
}
