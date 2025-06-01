using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using whole_crm.Models;

namespace whole_crm.Services
{
    public interface IProductService
    {
        Task<List<Product>> GetAllProductsAsync();
        Task<Product?> GetProductByIdAsync(int id);
        Task<List<Product>> SearchProductsAsync(string query);
        Task<Product?> UpdateProductAsync(int id, Product product);
        Task<bool> DeleteProductAsync(int id);
    }
}