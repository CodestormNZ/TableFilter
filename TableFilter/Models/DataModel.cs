using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Web;

namespace TableFilter.Models
{
  public class DataModel
  {
    public string Name { get; set; }
    public bool Active { get; set; }
    public int Status { get; set; }
    public List<DataModel> GetData()
    {
      List<DataModel> rslt = new List<DataModel>();
      Random rnd = new Random();
      for (int i = 0; i < 2500; i++)
      {
        DataModel dm = new DataModel();
        string str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ  ";
        int len = rnd.Next(4, 25);
        string name = "";
        int inx = 0;
        int ul = 0;
        string chr = "";
        for (int z = 0; z < len; z++)
        {
          if (z == 0)
          {
            inx = rnd.Next(0, 25);
          } else
          {
            inx = rnd.Next(0, 27);
          }

          ul = rnd.Next(0, 100);
          chr = str.Substring(inx, 1);
          if (ul > 20)
          {
            chr = chr.ToLower();
          }
          name += chr;
        }
        dm.Name = name; //i.ToString() + " " + 
        int x = rnd.Next(0, 2);
        if (x == 0)
          dm.Active = true;
        else dm.Active = false;
        dm.Status = rnd.Next(0, 4);
        rslt.Add(dm);
      }
      return rslt;
    }
  }

  public class DataList
  {
    public List<DataModel> dataArray { get; set; }
    public DataList()
    {
      dataArray = new List<DataModel>();
    }
  }
}