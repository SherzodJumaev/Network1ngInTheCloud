using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using whole_crm.Models;

namespace whole_crm.Services
{
    public interface IOrderService
    {
        Task<List<Order>> GetAllOrdersAsync();
        Task<Order?> GetOrderByIdAsync(int id);
        Task<Order?> UpdateOrderAsync(int id, Order order);
        Task<bool> DeleteOrderAsync(int id);
        Task<List<Order>> SearchOrdersAsync(string query);
    }
}