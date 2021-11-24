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
using Microsoft.Extensions.Configuration;

namespace Application.BBL.BusinessServices
{
    public class MonthActivityService : IMonthActivityService
    {
        private readonly IConfiguration _configuration;

        static readonly string[] Scopes = { SheetsService.Scope.Spreadsheets };
        private const string INITIAL_BACKGROUND_COLOR = "#FFFFFF";
        private const int RGB_FACTOR = 255;

        static SheetsService service;

        public MonthActivityService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public MonthActivityVewModel GetAllVacationsFromSheet(MonthActivityGetModel getModel)
        {
            try
            {
                service = ConfigureSheetService();

                //get list of Sheets
                var listOfSheets = SheetListNames();

                if (listOfSheets == null) return new MonthActivityVewModel() { ErrorMessage = "The sheet list is empty" };

                if (getModel.SheetName == null)
                    getModel.SheetName = listOfSheets.FirstOrDefault();


                var getRequest = new GetRequest(service, _configuration.GetValue<string>("GoogleApi:sheetId"));
                getRequest.IncludeGridData = true;
                getRequest.Ranges = new List<string> { $"{getModel.SheetName}!A{getModel.StartIndex}:ZZ{getModel.EndIndex}" };

                // Ecexuting Read Operation...
                var response = getRequest.Execute();

                var sheetValues = response.Sheets[0].Data[0].RowData;

                if (sheetValues == null) return new MonthActivityVewModel() { IsEmpty = true };

                var readSheetResponse = new List<List<MonthActivityModel>>();

                int rowIndex = getModel.StartIndex - 1;
                int columnIndex = 0;

                foreach (var sheetRow in sheetValues)
                {
                    var responseBuff = new List<MonthActivityModel>();
                    if (sheetRow.Values != null)
                    {
                        foreach (var sheetValue in sheetRow.Values)
                        {
                            string hex = sheetValue.EffectiveFormat != null ? GetHEXColor(sheetValue.EffectiveFormat?.BackgroundColor) : INITIAL_BACKGROUND_COLOR;

                            responseBuff.Add(new MonthActivityModel() { RowIndex = rowIndex, ColumnIndex = columnIndex, Data = sheetValue.FormattedValue?.ToString(), Color = hex });
                            columnIndex++;
                        }
                        readSheetResponse.Add(responseBuff);
                    }
                    columnIndex = 0;
                    rowIndex++;
                }

                return new MonthActivityVewModel() { MonthActivityModels = readSheetResponse, Sheets = listOfSheets, IsEmpty = false, ErrorMessage = null };
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
                Spreadsheet spr = service.Spreadsheets.Get(_configuration.GetValue<string>("GoogleApi:sheetId")).Execute();

                //get list of Sheets
                var listOfSheets = SheetListNames();

                if (listOfSheets == null) return false;

                List<string> listOfRanges = new List<string>();

                if (vacation.SheetName == null)
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
                var valuesResource1 = service.Spreadsheets.BatchUpdate(bussr, _configuration.GetValue<string>("GoogleApi:sheetId"));
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
                using (var stream = new FileStream(_configuration.GetValue<string>("GoogleApi:appClientSecret"), FileMode.Open, FileAccess.Read))
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
                var ssRequest = service.Spreadsheets.Get(_configuration.GetValue<string>("GoogleApi:sheetId"));
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