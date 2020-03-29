using Microsoft.EntityFrameworkCore;
using NetCoreAuctionHouse.Models;
namespace NetCoreAuctionHouse.DALC
{
    public class ItemContext : DbContext
    {
        public ItemContext(DbContextOptions<ItemContext>options)
            :base(options)
        {
        }
        public DbSet<Item> Items { get; set; }
    }
}
