using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.EntitiesModels.Models;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using static Google.Apis.Sheets.v4.SpreadsheetsResource;

namespace Application.BBL.BusinessServices
{
    public class MonthActivityService : IMonthActivityService
    {
        static readonly string[] Scopes = { SheetsService.Scope.Spreadsheets };
        //static readonly string ApplicationName = "Dot Tutorials";
        //static readonly string sheet = "October'21";
        //static readonly string SpreadsheetId = "18XJpskb88AAKQEBKE0C49z43NQfwKJR5JEMTgE-EYSc";
        private const string SPREADSHEET_ID = "18XJpskb88AAKQEBKE0C49z43NQfwKJR5JEMTgE-EYSc";
        private const string INITIAL_BACKGROUND_COLOR = "#FFFFFF";

        static SheetsService service;
        public MonthActivityVewModel GetAllVacationsFromSheet(string sheetName)
        {
            service = ConfigureSheetService();

            //get list of Sheets
            var listOfSheets = SheetListNames();
            List<string> listOfRanges = new List<string>();

            foreach (var range in listOfSheets)
            {
                listOfRanges.Add($"{range}!A1:AJ25");
            }

            // Specifying Column Range for reading...
            //var range = $"{listOfsheets[3]}!A1:AJ25";

            //var request = service.Spreadsheets.Values.Get(SPREADSHEET_ID, range);

            

            var getRequest = new GetRequest(service, SPREADSHEET_ID);
            getRequest.IncludeGridData = true;
            getRequest.Ranges = listOfRanges;

            //var spreadSheet = getRequest.Execute();
            //var color = spreadSheet.Sheets[0].Data[0].RowData[3].Values[11].EffectiveFormat.BackgroundColor;
            
            // Ecexuting Read Operation...


            //var response = request.Execute();
            var response = getRequest.Execute();

            // Getting all records from Column A to AJ...
            //var color = response1.Sheets[0].Data[0].RowData[22].Values[2].EffectiveFormat?.BackgroundColor;
            //Color myColor1 = Color.FromArgb(Convert.ToInt32(color?.Red)*255, Convert.ToInt32(color?.Green)*255, Convert.ToInt32(color?.Blue)*255);
            //string hex1 = "#" + myColor1.R.ToString("X2") + myColor1.G.ToString("X2") + myColor1.B.ToString("X2");

            //var sheetValues = response.Values;

            //foreach (var item in listOfsheets)
            //{
            //    var sheetValues = response.Sheets[].Data[item].RowData;
            //}
            var sheetIndex = 3;

            if (!string.IsNullOrEmpty(sheetName))
            {
                sheetIndex = listOfSheets.FindIndex(x => x == sheetName);
            }

            var sheetValues = response.Sheets[sheetIndex].Data[0].RowData;
            //var sheetTitle = response.Sheets[0].Properties.Title;

            var sheetValues1 = response.Sheets;


            var readSheetResponce = new List<List<MonthActivityModel>>();

            int rowIndex = 0;
            int columnIndex = 0;
            
            foreach (var sheetRow in sheetValues)
                {
                    var responceBuff = new List<MonthActivityModel>();
                    foreach (var sheetValue in sheetRow.Values)
                    {
                    string hex;
                        if(sheetValue.EffectiveFormat != null)
                        {
                            var red = Convert.ToInt32(sheetValue.EffectiveFormat?.BackgroundColor.Red * 255);
                            var green = Convert.ToInt32(sheetValue.EffectiveFormat?.BackgroundColor.Green * 255);
                            var blue = Convert.ToInt32(sheetValue.EffectiveFormat?.BackgroundColor.Blue * 255);
                            System.Drawing.Color myColor = System.Drawing.Color.FromArgb(red, green, blue);
                            hex = "#" + myColor.R.ToString("X2") + myColor.G.ToString("X2") + myColor.B.ToString("X2");
                        }
                        else
                        {
                            hex = INITIAL_BACKGROUND_COLOR;
                        }                        

                        responceBuff.Add(new MonthActivityModel() { RowIndex = rowIndex, ColumnIndex = columnIndex, Data = sheetValue.FormattedValue?.ToString(), Color = hex });
                        columnIndex++;                       
                    }
                    readSheetResponce.Add(responceBuff);
                    columnIndex = 0;
                    rowIndex++;
                }            
           
            return new MonthActivityVewModel() { MonthActivityModels = readSheetResponce, Sheets = listOfSheets };
        }

        public bool UpdateVacationOnSheet(MonthActivityModel vacation)
        {
            var valuesResource = ConfigureSheetService().Spreadsheets.Values;
            var WriteRange = ColumnNumberToLetter(3, 1);
            var valueRange = new ValueRange { Values = new List<IList<object>> { new List<object> { "ConvertTest2" } } };
            var update = valuesResource.Update(valueRange, "1WvLttGVFL3vFWlEo2JFAVY86G-vaKmBxSEiBqmvPXs4", WriteRange);
            update.ValueInputOption = ValuesResource.UpdateRequest.ValueInputOptionEnum.RAW;
            var response = update.Execute();
            return true;
        }
        private SheetsService ConfigureSheetService()
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
                //ApplicationName = ApplicationName,
            });

            return service;
        }
        private string ColumnNumberToLetter(int columnIndex, int rowIndex)
        {
            if(columnIndex < 26)
            columnIndex++;
            rowIndex++;
            string rowIndexStr = rowIndex.ToString();
            string res = "";
            int Base = 26;
            string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

            int TempNumber = columnIndex;
            while (TempNumber > 0)
            {
                int position = TempNumber % Base;
                res = (position == 0 ? 'Z' : chars[position > 0 ? position - 1 : 0]) + res;
                TempNumber = (TempNumber - 1) / Base;
            }
            res = res + rowIndexStr;
            return res;
        }
        public List<string> SheetListNames()
        {
            var ssRequest = service.Spreadsheets.Get(SPREADSHEET_ID);
            Spreadsheet ss = ssRequest.Execute();
            List<string> sheetList = new List<string>();

            foreach (Sheet sheet in ss.Sheets)
            {
                sheetList.Add(sheet.Properties.Title);
            }
            return sheetList;
        }
    }
}
