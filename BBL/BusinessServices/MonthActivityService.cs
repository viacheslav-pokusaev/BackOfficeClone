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
        private const string SPREADSHEET_ID = "18XJpskb88AAKQEBKE0C49z43NQfwKJR5JEMTgE-EYSc";
        //private const string SPREADSHEET_ID = "1WvLttGVFL3vFWlEo2JFAVY86G-vaKmBxSEiBqmvPXs4"; //need for tests
        private const string INITIAL_BACKGROUND_COLOR = "#FFFFFF";
        private const int RGB_FACTOR = 255;

        static SheetsService service;
        public MonthActivityVewModel GetAllVacationsFromSheet(MonthActivityGetModel getModel)
        {
            try
            {
                service = ConfigureSheetService();

                //get list of Sheets
                var listOfSheets = SheetListNames();

                if (listOfSheets == null) return new MonthActivityVewModel() { ErrorMessage = "The sheet list is empty" };

                if (getModel.SheetName == "default")
                    getModel.SheetName = listOfSheets.FirstOrDefault();


                var getRequest = new GetRequest(service, SPREADSHEET_ID);
                getRequest.IncludeGridData = true;
                getRequest.Ranges = new List<string> { $"{getModel.SheetName}!A{getModel.StartIndex}:ZZ{getModel.EndIndex}" };

                // Ecexuting Read Operation...
                var response = getRequest.Execute();

                var sheetValues = response.Sheets[0].Data[0].RowData;

                if (sheetValues == null) return new MonthActivityVewModel() { IsEmpty = true };

                var readSheetResponce = new List<List<MonthActivityModel>>();

                int rowIndex = getModel.StartIndex - 1;
                int columnIndex = 0;

                foreach (var sheetRow in sheetValues)
                {
                    var responceBuff = new List<MonthActivityModel>();
                    foreach (var sheetValue in sheetRow.Values)
                    {
                        string hex;
                        if (sheetValue.EffectiveFormat != null)
                        {
                            hex = GetHEXColor(sheetValue.EffectiveFormat?.BackgroundColor);
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

                return new MonthActivityVewModel() { MonthActivityModels = readSheetResponce, Sheets = listOfSheets, IsEmpty = false, ErrorMessage = null };
            }
            catch(Exception ex)
            {
                return new MonthActivityVewModel() { ErrorMessage = ex.Message };
            }
        }
        public bool UpdateVacationOnSheet(MonthActivityEditModel vacation)
        {
            try
            {
                //get all sheets
                Spreadsheet spr = service.Spreadsheets.Get(SPREADSHEET_ID).Execute();

                //get list of Sheets
                var listOfSheets = SheetListNames();

                if (listOfSheets == null) return false;

                List<string> listOfRanges = new List<string>();

                if (vacation.SheetName == "default")
                    vacation.SheetName = listOfSheets.FirstOrDefault();

                //get current sheet
                Sheet sh = spr.Sheets.Where(s => s.Properties.Title == vacation.SheetName).FirstOrDefault();
                //get sheet id by sheet name
                int sheetId = (int)sh.Properties.SheetId;
                var color = GetRGBColor(vacation.Color);

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
            catch(Exception ex)
            {
                return false;
            }
        }
        private System.Drawing.Color GetRGBColor(string hexColor)
        {
            try
            {
                if (hexColor.IndexOf('#') != -1)
                    hexColor = hexColor.Replace("#", "");

                int red = int.Parse(hexColor.Substring(0, 2), NumberStyles.AllowHexSpecifier) / RGB_FACTOR;
                int green = int.Parse(hexColor.Substring(2, 2), NumberStyles.AllowHexSpecifier) / RGB_FACTOR;
                int blue = int.Parse(hexColor.Substring(4, 2), NumberStyles.AllowHexSpecifier) / RGB_FACTOR;

                var rgbColor = System.Drawing.Color.FromArgb(red, green, blue);
                return rgbColor;
            }
            catch(Exception ex)
            {
                return System.Drawing.Color.FromArgb(0, 255, 255, 255);
            }
        }
        private string GetHEXColor(Google.Apis.Sheets.v4.Data.Color color)
        {
            try
            {
                var red = Convert.ToInt32(color.Red * RGB_FACTOR);
                var green = Convert.ToInt32(color.Green * RGB_FACTOR);
                var blue = Convert.ToInt32(color.Blue * RGB_FACTOR);
                System.Drawing.Color myColor = System.Drawing.Color.FromArgb(red, green, blue);
                var hex = "#" + myColor.R.ToString("X2") + myColor.G.ToString("X2") + myColor.B.ToString("X2");
                return hex;
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }
        private SheetsService ConfigureSheetService()
        {
            GoogleCredential credential;
            try
            {
                //Reading Credentials File...
                using (var stream = new FileStream("inlaid-crowbar-330810-0492784c4579.json", FileMode.Open, FileAccess.Read))
                {
                    credential = GoogleCredential.FromStream(stream).CreateScoped(Scopes);
                }

                // Creating Google Sheets API service...
                service = new SheetsService(new BaseClientService.Initializer()
                {
                    HttpClientInitializer = credential
                });

                return service;
            }
            catch(Exception ex)
            {
                return null;
            }
        }
        public List<string> SheetListNames()
        {
            try
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
            catch(Exception ex)
            {
                return null;
            }
        }
    }
}