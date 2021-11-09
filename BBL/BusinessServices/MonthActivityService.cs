using Application.BBLInterfaces.BusinessServicesInterfaces;
using Application.EntitiesModels.Models.MonthActivityModels;
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
using static Google.Apis.Sheets.v4.Data.Color;
using System.Globalization;

namespace Application.BBL.BusinessServices
{
    public class MonthActivityService : IMonthActivityService
    {
        static readonly string[] Scopes = { SheetsService.Scope.Spreadsheets };
        //static readonly string ApplicationName = "Dot Tutorials";
        //static readonly string sheet = "October'21";
        //static readonly string SpreadsheetId = "18XJpskb88AAKQEBKE0C49z43NQfwKJR5JEMTgE-EYSc";
        //private const string SPREADSHEET_ID = "18XJpskb88AAKQEBKE0C49z43NQfwKJR5JEMTgE-EYSc";
        private const string SPREADSHEET_ID = "1WvLttGVFL3vFWlEo2JFAVY86G-vaKmBxSEiBqmvPXs4";
        private const string INITIAL_BACKGROUND_COLOR = "#FFFFFF";
        private const int RGB_FACTOR = 255;

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
            var sheetIndex = 0;

            if (!string.IsNullOrEmpty(sheetName) && sheetName != "default")
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
                    System.Drawing.Color myColor;
                        if (sheetValue.EffectiveFormat != null)
                        {                          
                            var red = Convert.ToInt32(sheetValue.EffectiveFormat?.BackgroundColor.Red * RGB_FACTOR);
                            var green = Convert.ToInt32(sheetValue.EffectiveFormat?.BackgroundColor.Green * RGB_FACTOR);
                            var blue = Convert.ToInt32(sheetValue.EffectiveFormat?.BackgroundColor.Blue * RGB_FACTOR);
                            myColor = System.Drawing.Color.FromArgb(red, green, blue);
                            hex = "#" + myColor.R.ToString("X2") + myColor.G.ToString("X2") + myColor.B.ToString("X2");
                        }
                        else
                        {
                            hex = INITIAL_BACKGROUND_COLOR;
                        }                        

                        responceBuff.Add(new MonthActivityModel() { RowIndex = rowIndex, ColumnIndex = columnIndex, Data = sheetValue.FormattedValue?.ToString(), Color = hex/*, ColorRGB = color*/ });
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
            //get all sheets
            Spreadsheet spr = service.Spreadsheets.Get(SPREADSHEET_ID).Execute();
            //get currunt sheet
            Sheet sh = spr.Sheets.Where(s => s.Properties.Title == "Лист1").FirstOrDefault();
            //get sheet id by sheet name
            int sheetId = (int)sh.Properties.SheetId;

            if (vacation.Color.IndexOf('#') != -1)
                vacation.Color = vacation.Color.Replace("#", "");      

            int red = int.Parse(vacation.Color.Substring(0, 2), NumberStyles.AllowHexSpecifier) / RGB_FACTOR;
            int green = int.Parse(vacation.Color.Substring(2, 2), NumberStyles.AllowHexSpecifier) / RGB_FACTOR;
            int blue = int.Parse(vacation.Color.Substring(4, 2), NumberStyles.AllowHexSpecifier) / RGB_FACTOR;
            
            var color = System.Drawing.Color.FromArgb(red, green, blue);
            
            //define cell color
            var userEnteredFormat = new CellFormat()
            {
                BackgroundColor = new Google.Apis.Sheets.v4.Data.Color()
                {
                    Red = color.R,
                    Green = color.G,
                    Blue = color.B
                }                
            };

            var userEnteredValue = new ExtendedValue()
            {
                StringValue = (string)vacation.Data
            };

            BatchUpdateSpreadsheetRequest bussr = new BatchUpdateSpreadsheetRequest();

            //create the update request for cell
            var updateCellsBackgroundColor = new Request()
            {
                RepeatCell = new RepeatCellRequest()
                {
                    Range = new GridRange()
                    {
                        SheetId = sheetId,
                        StartColumnIndex = vacation.ColumnIndex,
                        StartRowIndex = vacation.RowIndex,
                        EndColumnIndex = vacation.ColumnIndex + 1,
                        EndRowIndex = vacation.RowIndex + 1
                    },
                    Cell = new CellData()
                    {
                        UserEnteredFormat = userEnteredFormat,
                        UserEnteredValue = userEnteredValue
                    },                 
                    Fields = "UserEnteredFormat(BackgroundColor)"                   
                }
            };

            var updateCellsValue = new Request()
            {
                RepeatCell = new RepeatCellRequest()
                {
                    Range = new GridRange()
                    {
                        SheetId = sheetId,
                        StartColumnIndex = vacation.ColumnIndex,
                        StartRowIndex = vacation.RowIndex,
                        EndColumnIndex = vacation.ColumnIndex + 1,
                        EndRowIndex = vacation.RowIndex + 1
                    },
                    Cell = new CellData()
                    {
                        
                        UserEnteredValue = userEnteredValue
                    },
                    Fields = "UserEnteredValue(StringValue)"
                }
            };

            bussr.Requests = new List<Request>();
            bussr.Requests.Add(updateCellsBackgroundColor);
            bussr.Requests.Add(updateCellsValue);
            var valuesResource1 = service.Spreadsheets.BatchUpdate(bussr, SPREADSHEET_ID);
            valuesResource1.Execute();

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

        public bool AddNewSheet(AddSheetViewModel addSheetModel)
        {
            try
            {
                service = ConfigureSheetService();
                var addSheetRequest = new AddSheetRequest();
                addSheetRequest.Properties = new SheetProperties();
                //addSheetRequest.Properties.Title = addSheetModel.SheetName;
                addSheetRequest.Properties.Title = addSheetModel.SheetName;

                BatchUpdateSpreadsheetRequest batchUpdateSpreadsheetRequest = new BatchUpdateSpreadsheetRequest();
                batchUpdateSpreadsheetRequest.Requests = new List<Request>();

                batchUpdateSpreadsheetRequest.Requests.Add(new Request
                {
                    AddSheet = addSheetRequest
                });
                var batchUpdateRequest = service.Spreadsheets.BatchUpdate(batchUpdateSpreadsheetRequest, SPREADSHEET_ID);
                var responce = batchUpdateRequest.Execute();

                //get data from parrent
                //var getRequest = new GetRequest(service, SPREADSHEET_ID);
                //var getParrentResponse = getRequest.Execute();

                //var sheetIndex = 0;
                //var listOfSheets = SheetListNames();

                //if (!string.IsNullOrEmpty(addSheetModel.ParrentSheetName))
                //{
                //    sheetIndex = listOfSheets.FindIndex(x => x == addSheetModel.ParrentSheetName);
                //}
                //var sheetValues = getParrentResponse.Sheets[sheetIndex].Data[0].RowData;

                return true;

            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
