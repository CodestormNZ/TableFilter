using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TableFilter.Models;

namespace TableFilter.Controllers
{
  public class HomeController : Controller
  {
    public ActionResult Index()
    {
      return View();
    }
    public string DataAjaxLoader()
    {
      DataList dl = new DataList();
      dl.Data.AddRange(new DataModel().GetData());
      var jsonData = JsonConvert.SerializeObject(dl);
      return jsonData;
    }

  }
}