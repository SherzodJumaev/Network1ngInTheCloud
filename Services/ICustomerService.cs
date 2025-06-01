using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using whole_crm.Models;

namespace whole_crm.Services
{
    public interface ICustomerService
    {
        Task<List<Customer>> GetAllCustomersAsync();
        Task<Customer?> GetCustomerByIdAsync(int id);
        Task<Customer?> UpdateCustomerAsync(int id, Customer customer);
        Task<bool> DeleteCustomerAsync(int id);
        Task<List<Customer>> SearchCustomersAsync(string query);
    }
}