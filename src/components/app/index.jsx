import { useState, useEffect } from "react";
import { CardList } from "../card-list";
import { Footer } from "../footer";
import { Header } from "../header";
import { Sort } from "../sort";
import { dataCard } from "../../data";
import s from "./styles.module.css";
import { Logo } from "../logo";
import { Search } from "../search";
import { Button } from "../button";
// import styled from 'styled-components';
import api from '../../utils/api';
import { useDebounce } from "../../hooks/useDebounce";
import { isLiked } from '../../utils/products';


export function App() {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const debounceSearchQuery = useDebounce(searchQuery, 300)
  function handleRequest() {
    // const filterCards = dataCard.filter((item) =>
    //   item.name.includes(searchQuery)
    // );
    // setCards(filterCards);

    api.search(debounceSearchQuery)
      .then((dataSearch) => {
        setCards(dataSearch);
        // console.log(data);
      })
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    handleRequest();
  }

  
  function handleInputChange(dataInput) {
    setSearchQuery(dataInput);
  }

  function handleUpdateUser(dataUserUpdate) {
    api.setUserInfo(dataUserUpdate)
      .then((updateUserFromServer) => {
        setCurrentUser(updateUserFromServer)
      })
  }

  function handleProductLike(product) {
    const like = isLiked(product.likes, currentUser._id)
    api.changeLikeProductStatus(product._id, like)
      .then((updateCard) => {
        const newProducts = cards.map(cardState => {
          return cardState._id === updateCard._id ? updateCard : cardState
        })

        setCards(newProducts)
      })
  }
  


    useEffect(() => {
      handleRequest();
    }, [debounceSearchQuery]);


    useEffect(() => {
      api.getAllInfo()
       .then(([productsData, userInfoData]) => {
        setCurrentUser(userInfoData);
        setCards(productsData.products);
      })
      .catch(err => console.log(err))
    }, [])

    return (
      <>
        <Header user={currentUser} oneUpdateUser={handleUpdateUser}>
          <Logo />
          <Search
            handleFormSubmit={handleFormSubmit}
            handleInputChange={handleInputChange}
          />
        </Header>
        <main className="content container">
          {/* <Title> Стилизованный заголовок </Title>
          <Button>Купить</Button>
          <Button primary>Отложить</Button>
          <TomatoButton as="a" href="#">Удалить</TomatoButton>
          <StyledLink>Ссылка</StyledLink> */}
        {/* <h1 style={headerStyle}>Стилизованный заголовок</h1>
        {/* <Button htmlType="button" type="primary" extraClass={s.button}>Купить</Button>
        <Button htmlType="button" type="secondary">Отложить</Button> */}

        {/* <Button htmlType="button">Купить</Button> */}
          <Sort/>
          <CardList goods={cards} onProductLike={handleProductLike} currentUser={currentUser} />
        </main>
        <Footer />
      </>
    );
   }