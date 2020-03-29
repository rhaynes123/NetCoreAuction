using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace NetCoreAuctionHouse.Models
{
    [Table("item_info")]
    public class Item
    {
        [Column("id")]
        public int Id { get; set; }
        [Required,Column("description")]
        public string description { get; set; }
        [Required, Column("reserve_price")]
        public double ReservePrice  { get; set; }
        //[Required, Column("date_added")]
        //public DateTime DateAdded { get; set; }
        public Item()
        {
        }
    }
}
