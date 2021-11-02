using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.EntitiesModels.Models;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using static Google.Apis.Sheets.v4.SpreadsheetsResource;

namespace Application.BBL.BusinessServices
{
    public class MonthActivityService : IMonthActivityService
    {
        static readonly string[] Scopes = { SheetsService.Scope.Spreadsheets };
        static readonly string ApplicationName = "Dot Tutorials";
        static readonly string sheet = "October'21";
        static readonly string SpreadsheetId = "18XJpskb88AAKQEBKE0C49z43NQfwKJR5JEMTgE-EYSc";

        static SheetsService service;
        public List<List<MonthActivityModel>> GetAllVacationsFromSheet()
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
            //var request = service.Spreadsheets.Values.Get(SpreadsheetId, range);            



            var getRequest = new GetRequest(service, SpreadsheetId);
            getRequest.IncludeGridData = true;
            getRequest.Ranges = range;

            //var spreadSheet = getRequest.Execute();
            //var color = spreadSheet.Sheets[0].Data[0].RowData[3].Values[11].EffectiveFormat.BackgroundColor;
            









            // Ecexuting Read Operation...


            //var response = request.Execute();
            var response1 = getRequest.Execute();

            // Getting all records from Column A to AJ...
            //var color = response1.Sheets[0].Data[0].RowData[3].Values[11].EffectiveFormat.BackgroundColor;

            
            
            //var sheetValues = response.Values;

            

            var sheetValues1 = response1.Sheets[0].Data[0].RowData;
            

            var readSheetResponce = new List<List<MonthActivityModel>>();

            int rowIndex = 0;
            int columnIndex = 0;

            foreach (var sheetRow in sheetValues1)
            {
                var responceBuff = new List<MonthActivityModel>();
                foreach (var sheetValue in sheetRow.Values)
                {
                    responceBuff.Add(new MonthActivityModel() { RowIndex = rowIndex, ColumnIndex = columnIndex, Data = sheetValue.FormattedValue?.ToString() });
                    columnIndex++;
                }
                readSheetResponce.Add(responceBuff);
                columnIndex = 0;
                rowIndex++;
            }
            return readSheetResponce;
        }

        public bool UpdateVacationOnSheet(MonthActivityModel vacation)
        {
            throw new NotImplementedException();
        }
    }
}
