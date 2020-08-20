export const TYPES = {
  // Repositories
  IPaymentStripeRepository: Symbol.for('IPaymentStripeRepository'),
  IProductCaseRepository: Symbol.for('IProductCaseRepository'),
  IProductShoeRepository: Symbol.for('IProductShoeRepository'),
  ITaxCanadaRepository: Symbol.for('ITaxCanadaRepository'),
  ITaxBrazilRepository: Symbol.for('ITaxBrazilRepository'),
  IShippingRepository: Symbol.for('IShippingRepository'),
  ICustomerRepository: Symbol.for('ICustomerRepository'),
  IUnitCaseRepository: Symbol.for('IUnitCaseRepository'),
  IUnitShoeRepository: Symbol.for('IUnitShoeRepository'),
  IProductRepository: Symbol.for('IProductRepository'),
  IAddressRepository: Symbol.for('IAddressRepository'),
  IBillingRepository: Symbol.for('IBillingRepository'),
  IPricingRepository: Symbol.for('IPricingRepository'),
  IPaymentRepository: Symbol.for('IPaymentRepository'),
  ICatalogRepository: Symbol.for('ICatalogRepository'),
  IOrderRepository: Symbol.for('IOrderRepository'),
  IStockRepository: Symbol.for('IStockRepository'),
  IUnitRepository: Symbol.for('IUnitRepository'),
  IItemRepository: Symbol.for('IItemRepository'),
  ITaxRepository: Symbol.for('ITaxRepository'),

  // Services
  ICurrencyService: Symbol.for('ICurrencyService'),
  IShippingService: Symbol.for('IShippingService'),
  IBillingService: Symbol.for('IBillingService'),
  IPaymentService: Symbol.for('IPaymentService'),
  ICatalogService: Symbol.for('ICatalogService'),
  IStripeService: Symbol.for('IStripeService'),
  IOrderService: Symbol.for('IOrderService'),
  IStockService: Symbol.for('IStockService'),
  IEmailService: Symbol.for('IEmailService'),
  ITaxService: Symbol.for('ITaxService'),

  // Interactors
  AuthorizePaymentInteractor: Symbol.for('AuthorizePaymentInteractor'),
  GetShippingCostInteractor: Symbol.for('GetShippingCostInteractor'),
  RetrieveProductInteractor: Symbol.for('RetrieveProductInteractor'),
  CapturePaymentInteractor: Symbol.for('CapturePaymentInteractor'),
  RetrieveOrderInteractor: Symbol.for('RetrieveOrderInteractor'),
  CancelPaymentInteractor: Symbol.for('CancelPaymentInteractor'),
  RetrieveUnitInteractor: Symbol.for('RetrieveUnitInteractor'),
  InsertOrderInteractor: Symbol.for('InsertOrderInteractor'),
  FailPaymentInteractor: Symbol.for('FailPaymentInteractor'),
  GetCatalogInteractor: Symbol.for('GetCatalogInteractor'),

  // Validators
  IGetShippingCostValidator: Symbol.for('IGetShippingCostValidator'),
  IRetrieveProductValidator: Symbol.for('IRetrieveProductValidator'),
  IRetrieveOrderValidator: Symbol.for('IRetrieveOrderValidator'),
  IRetrieveUnitValidator: Symbol.for('IRetrieveUnitValidator'),
  IInsertOrderValidator: Symbol.for('IInsertOrderValidator'),
  IGetCatalogValidator: Symbol.for('IGetCatalogValidator'),

  // Controllers
  ICatalogController: Symbol.for('ICatalogController'),
  IProductController: Symbol.for('IProductController'),
  IStripeController: Symbol.for('IStripeController'),
  IOrderController: Symbol.for('IOrderController'),
  IUnitController: Symbol.for('IUnitController'),

  // Presenters
  IGetShippingCostPresenter: Symbol.for('IGetShippingCostPresenter'),
  IRetrieveProductPresenter: Symbol.for('IRetrieveProductPresenter'),
  IRetrieveOrderPresenter: Symbol.for('IRetrieveOrderPresenter'),
  IRetrieveUnitPresenter: Symbol.for('IRetrieveUnitPresenter'),
  IInsertOrderPresenter: Symbol.for('IInsertOrderPresenter'),
  IGetCatalogPresenter: Symbol.for('IGetCatalogPresenter'),

  // Data Context
  IDataContext: Symbol.for('IDataContext'),

  // Unit of Work
  IUnitOfWork: Symbol.for('IUnitOfWork'),
};
