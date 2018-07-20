using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace time_sucks.Models
{
    public class EvalTemplateQuestionCategories
    {
        public int evalTemplateQuestionID { get; set; }
        public int evalTemplateID { get; set; }
        public string categoryName { get; set; }
    }
}
