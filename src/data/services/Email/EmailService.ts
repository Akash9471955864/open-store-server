import {ShippingType} from '../../../domain/entities/ShippingType';
import {toString} from '../../../domain/entities/Currency';
import {Order} from '../../../domain/entities/Order';
import {IEmailService} from './IEmailService';
import {injectable} from 'inversify';
import mailgun from 'mailgun-js';

@injectable()
export class EmailService implements IEmailService {
  DOMAIN = process.env.MAILGUN_DOMAIN;
  mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY!,
    domain: this.DOMAIN!,
  });

  private sendEmail(to: string, subject: string, text: string): void {
    const from = this.getSender();
    const message = {from, to, subject, text};

    this.mg.messages().send(message, function (error, body) {
      if (error) console.error(`Failed to send email to '${to}'`);
      else console.log(`Sent email to '${to}'`);
    });
  }

  private getSender(): string {
    return 'The Company <contact@company.com>';
  }

  sendInternalOrderPlacedEmail(order: Order): void {
    const to = 'order.placed@company.com';
    const subject = `Order #${order.ID} has been placed`;

    const message = [];
    message.push(`${new Date().toDateString()}\n\n`);
    message.push('Order Summary:\n\n');

    order.Items.forEach(x => {
      message.push(`${x.Unit.toString()}\nQUANTITY: ${x.Quantity}\n\n`);
    });

    const totalPrice = order.Items.reduce((x, y) => x + y.TotalPrice.Price, 0);
    const currency = toString(order.Items[0].TotalPrice.Currency);
    message.push(`> TOTAL: $${totalPrice / 100} ${currency}\n\n`);

    message.push('Shipping:\n\n');
    message.push(`TO: ${order.Customer.Name}\n`);
    message.push(`STREET: ${order.Shipping.Address.Street}\n`);
    message.push(`CITY: ${order.Shipping.Address.City}\n`);
    message.push(`PROVINCE: ${order.Shipping.Address.State}\n`);
    message.push(`POSTAL CODE: ${order.Shipping.Address.PostalCode}\n`);
    message.push(`TYPE: ${ShippingType[order.Shipping.Type]}\n`);

    const text = message.join('');
    this.sendEmail(to, subject, text);
  }

  sendOrderConfirmedEmail(order: Order): void {
    const to = order.Customer.Email;
    const subject = `Your order has been placed!`;

    const message = [];
    message.push('Greetings,\nYour order has been placed successfully! ');
    message.push(
      'Please allow a couple of business days for production and shipping. '
    );
    message.push('Your order summary is below:\n\n');

    order.Items.forEach(x => {
      message.push(`- ${x.Unit.Product.Name} x${x.Quantity}\n\n`);
    });

    const totalPrice = order.Items.reduce((x, y) => x + y.TotalPrice.Price, 0);
    const currency = toString(order.Items[0].TotalPrice.Currency);
    message.push(`Total: $${totalPrice / 100} ${currency}\n\n`);

    message.push(
      "You'll soon be part of a community of rounded people, just like you!\n\n"
    );
    message.push('Enjoy!\n\nThe Company');

    const text = message.join('');
    this.sendEmail(to, subject, text);
  }

  sendOrderCancelledEmail(order: Order): void {
    const to = order.Customer.Email; // Change to order.customer.Email;
    const subject = `There was a problem placing your order!`;

    const message = [];
    message.push('Greetings,\nThere was a problem placing your order. ');
    message.push(
      'No charge has been made to your credit card. If there is an authorization, ' +
        'it will disappear in at most 7 days.\n\n'
    );
    message.push('Feel free to try again.\n\n');
    message.push('Thanks,\n\nThe Company');

    const text = message.join('');
    this.sendEmail(to, subject, text);
  }

  sendPaymentFailedEmail(order: Order): void {
    const to = order.Customer.Email;
    const subject = `There was a problem placing your order!`;

    const message = [];
    message.push('Greetings,\nThere was a problem placing your order. ');
    message.push(
      `There was a problem charging your credit card from our servers. \
      If your bank shows an authorization, it will disappear in at most 7 days.\
      \nYou can try a different payment method using the link below:\n\n\
      link.company.com/checkout/${order.ID}\n\n`
    );
    message.push('Thanks,\n\nThe Company');

    const text = message.join('');
    this.sendEmail(to, subject, text);
  }

  sendContactMessage(
    name: string,
    email: string,
    order: string,
    message: string
  ) {
    const to = 'contact@company.com';
    const subject = `Message from '${name}'`;

    const content = [];
    content.push(`${new Date().toDateString()}\n`);
    content.push(message);
    content.push('\n');

    content.push(`Reply to: ${name}, ${email}`);
    content.push(`Order #: ${order}`);

    this.sendEmail(to, subject, content.join('\n'));
  }

  // Constructor
  constructor() {}
}
