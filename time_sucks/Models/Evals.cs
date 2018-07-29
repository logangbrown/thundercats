using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace time_sucks.Models
{
    public class Evals
    {
        public int evalID { get; set; }
        public int evalTemplateID { get; set; }
        public int groupID { get; set; }
        public int userID { get; set; }

        public int number { get; set; }
        public bool isComplete { get; set; }
    }
}
