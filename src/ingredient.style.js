import styled from 'styled-components';
import Chess from './imgs/Chess.png';
import closeBurger from './imgs/closeBurger.png';
import openBread from './imgs/openBurger.png';
import Beacon from './imgs/Beacon.png';
import Mead from './imgs/Mead.png';
export const Burger = styled.div`
  display: flex;
  flex-direction: column;
  button {
    background: none;
    border: none;
  }
  button:focus {
    outline: none;
  }
  .Chess {
    width: 315px;
    height: 20px;
    background-image: url(${Chess});
    background-repeat: no-repeat;
    background-size: contain;
  }
  .CloseBread {
    width: 315px;
    height: 140px;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url(${closeBurger});
  }
  .OpenBread {
    width: 315px;
    height: 70px;
    background-image: url(${openBread});
    background-repeat: no-repeat;
    background-size: contain;
  }
  .Mead {
    width: 315px;
    height: 70px;
    background-image: url(${Mead});
    background-repeat: no-repeat;
    background-size: contain;
  }
  .Beacon {
    width: 315px;
    height: 32px;
    background-image: url(${Beacon});
    background-repeat: no-repeat;
    background-size: contain;
  }
`;
