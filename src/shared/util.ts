import { jwtDecode } from 'jwt-decode';

export function getDecodedAccessToken(token: string): any {
  try {
    return jwtDecode(token);
  } catch (Error) {
    return null;
  }
}

class Transaction {
  status: boolean = false;
  amount: string = '';
  span: string = '';
}
export class Income extends Transaction {}

export class Expense extends Transaction {}

export function scroll() {
  window.scroll(0, 0);
}
export class AuthCredintials {
  email: String = '';
  password: String = '';
  interestedIn: 'Interested In' = 'Interested In';
}
export class SocialAuthCredintials {
  name: String = '';
  email: String = '';
  phone: String = '';
}
