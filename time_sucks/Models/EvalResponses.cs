using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace time_sucks.Models
{
    public class EvalResponses
    {
        public int evalResponseID { get; set; }
        public int evalID { get; set; }
        public int evalTemplateQuestionID { get; set; }
        public int userID { get; set; }
        public string response { get; set; }
    }
}
