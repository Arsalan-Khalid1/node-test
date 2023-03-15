import bcrypt from 'bcrypt';
import { LoginDTO, SignupDTO } from '../dtos/auth.dto';
import { Secret, sign } from 'jsonwebtoken';
import config from '../../config';
import User from '../models/user.model';

export class AuthService {
  async signup(signupDto: SignupDTO) {
    const user = await User.create({
        name: signupDto.name,
        email: signupDto.email,
        password: await bcrypt.hash(signupDto.password, 10)
    })
    if(user)
    {
      return user
    }
  }

  generateToken(user: {
    id: any;
  }) {
    const token = sign({ id: user.id }, config.SECRET_KEY as Secret, { expiresIn: '100m' });
    return  token
  }

  async login(loginDto: LoginDTO) {
    const {email, password} = loginDto;
    const user = await User.findOne({
        email,
    })

    if (!user) {
      throw new Error('Invalid credentials')
    }

    const isMatch = await bcrypt.compare(password, user.password)


    if (!isMatch) {
      throw new Error('Invalid credentials')
    }  

    return {accessToken: this.generateToken({ id: user._id }), user: {
      id: user.id, name: user.name, email: user.email
    }}
  }
}
