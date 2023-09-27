using AutoMapper;
using BusinessLogicLayer.Interfaces;
using BusinessLogicLayer.Models;
using DataAccessLayer.Context;
using DataAccessLayer.Entities;

namespace BusinessLogicLayer.Services
{
    public class CustomerService:ICustomerService
    {
        private readonly IDataProvider _dataProvider;
        private readonly IMapper _mapper;

        public CustomerService(IDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
            _mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Customer, CustomerModel>();
                cfg.CreateMap<Address, AddressModel>();
                cfg.CreateMap<CustomerModel, Customer>();
                cfg.CreateMap<AddressModel, Address>();

            }).CreateMapper();
        }

        public async Task<IEnumerable<CustomerModel>> GetAllCustomersAsync()
        {
            using var unitOfWork = _dataProvider.GetUnitOfWork();
            var customers
                = await unitOfWork.Repository<Customer>().GetAllIncludingAsync(c => c.Address);
            return customers.Select(_mapper.Map<CustomerModel>).ToList();
        }

        public async Task AddCustomersAsync(CustomerModel customerModel)
        {
            try
            {
                using var unitOfWork = _dataProvider.GetUnitOfWork();
                var customer = _mapper.Map<Customer>(customerModel);
                await unitOfWork.Repository<Customer>().AddAsync(customer);
                await unitOfWork.CommitAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
            
        }
        
        public async Task UpdateCustomersAsync(CustomerModel customerModel)
        {
            try
            {
                using var unitOfWork = _dataProvider.GetUnitOfWork();
                var customer = _mapper.Map<Customer>(customerModel);
                unitOfWork.Repository<Customer>().Update(customer);
                await unitOfWork.CommitAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
        
        public async Task DeleteCustomersAsync(int customerId)
        {
            try
            {
                using var unitOfWork = _dataProvider.GetUnitOfWork();
                var customers
                    = await unitOfWork.Repository<Customer>().GetAllIncludingAsync(c => c.Address);
                var customer = customers.FirstOrDefault(customer => customer.Id== customerId);
                unitOfWork.Repository<Customer>().DeleteAsync(customer);
                await unitOfWork.CommitAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }
}
