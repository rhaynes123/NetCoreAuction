using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using NetCoreAuctionHouse.DALC;
using NetCoreAuctionHouse.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NetCoreAuctionHouse.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    //[EnableCors)]
    public class ItemController : Controller
    {
        private readonly ItemContext _context;
        
        public ItemController(ItemContext context)
        {
            _context = context;

            
        }
        // GET: api/values
        // curl  https://localhost:5001/api/v1/item
        [EnableCors("OriginPolicy")]
        [HttpGet]
        public IEnumerable<Item> GetItems()
        {
            var ItemsList = _context.Items;
            return ItemsList;
            //Console.WriteLine(ItemsList);
        }
        [EnableCors("OriginPolicy")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItemById(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }
        /*	 Used the below example curl to test the mysql trigger to track the bids worked as expected.
  *  Example Curl :curl -X POST -H "Content-Type: application/json" -d '{"id": 1, "description": "Rare cup", "reservePrice": 35}' http://localhost:5001/item/1
  *
  *  curl -X POST -H "Content-Type: application/json" -d '{"description": "water bottle", "reservePrice": 35}' https://localhost:5001/item/
  *  curl -X POST -H "Content-Type: application/json" -d '{"description": "cookie jar", "reservePrice": 35}' https://localhost:5001/item/

*/
        [HttpPost]
        public void PostNewItem([FromBody]Item newitem)
        {
            _context.Items.Add(newitem);
            _context.SaveChanges();
        }
        /*	 Used the below example curl to test the mysql trigger to track the bids worked as expected.
 *  Example Curl :curl -X PUT -H "Content-Type: application/json" -d '{"id": 1, "description": "Rare cup", "reservePrice": 35}' https://localhost:3000/api/v1/item/1
 *  curl -X PUT -H "Content-Type: application/json" -d '{"description": "water bottle", "reservePrice": 45}' https://localhost:5001/item/2
*/
        [EnableCors("OriginPolicy")]
        [HttpPut("{id}")]
        public void UpdateItem(int id, [FromBody] Item updateditem)
        {
            var model = _context.Items.Find(id);
            //model.Id = updateditem.Id;
            model.description = updateditem.description;
            model.ReservePrice = updateditem.ReservePrice;
            _context.SaveChanges();
        }
    }
}
