namespace Application.EntitiesModels.Models
{
    public class ListVacationModel
    {
        public int Year { get; set; }

        public int CountDays { get; set; }

        public int KilledDays { get; set; }

        public int AccumulatedDays { get; set; }

        public int AvailableDays { get; set; }

        public ListVacationModel(int year = 0, int countDay = 0, int killedDay = 0, int accumulatedDay = 0, int availableDays = 0)
        {
            Year = year;
            CountDays = countDay;
            KilledDays = killedDay;
            AccumulatedDays = accumulatedDay;
            AvailableDays = availableDays;
        }
    }
}
