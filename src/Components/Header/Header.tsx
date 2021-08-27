import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { TodoDate } from 'utils/todoDate';
import { ReactComponent as filterIcon } from 'Assets/icons/filter.svg';
import { Tfilter } from 'types';
import Filter from 'Components/Filter';
import CloseIcon from 'Assets/icons/closeButton.svg';

interface HeaderProps {
  filter: Tfilter;
  setFilter: React.Dispatch<React.SetStateAction<Tfilter>>;
  openedFilter: boolean;
  setOpenedFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({
  filter,
  setFilter,
  openedFilter,
  setOpenedFilter,
}: HeaderProps) => {
  const [focusTodo, setFocusTodo] = useState<boolean>(false);
  const [focusValue, setFocusValue] = useState<string>('');

  useEffect(() => {
    loadFocusTodo();
  }, [focusTodo]);

  const loadFocusTodo = () => {
    const focusTodo = localStorage.getItem('focus');

    if (focusTodo === null) {
      setFocusTodo(false);
    } else {
      setFocusTodo(true);
    }
  };
  const getTodayDate = () => {
    const today = new TodoDate();
    return today.getToday();
  };

  const handleOnClick = () => {
    setOpenedFilter(true);
  };

  const handleFocusTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFocusValue(e.target.value);
  };

  const handleSubmitFocus = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    localStorage.setItem('focus', focusValue);
    setFocusTodo(true);
  };

  const handleModifyFocusTodo = () => {
    localStorage.removeItem('focus');
    setFocusValue('');
    setFocusTodo(false);
  };

  return (
    <>
      <HeaderLayout>
        <div className="time" style={{ display: 'flex' }}>
          <HeaderTitleLayout>{`Today is : ${getTodayDate()}`}</HeaderTitleLayout>
          <FilterIconLayout>
            <FilterIcon onClick={handleOnClick} />
            <FilterSection opened={openedFilter}>
              {openedFilter && (
                <>
                  <Filter
                    filter={filter}
                    setFilter={setFilter}
                    setOpenedFilter={setOpenedFilter}
                  />
                  <Close onClick={() => setOpenedFilter(false)}>
                    <img src={CloseIcon} />
                  </Close>
                </>
              )}
            </FilterSection>
          </FilterIconLayout>
        </div>
        <div>
          {focusTodo ? (
            <>
              <div className="focusValueWrap" style={{ display: 'flex' }}>
                <h3>{focusValue}</h3>
                <button
                  style={{
                    background: 'black',
                    color: 'white',
                    cursor: 'pointer',
                    width: '20%',
                  }}
                  onClick={handleModifyFocusTodo}
                >
                  수정
                </button>
              </div>
            </>
          ) : (
            <>
              <form className="inputForm" onSubmit={handleSubmitFocus}>
                <h2>오늘 가장 집중해야할 일을 적어보세요.</h2>
                <div className="inputWrap" style={{ display: 'flex' }}>
                  <input
                    placeholder="오늘 가장 집중이 필요한 한가지 일을 작성해보세요"
                    value={focusValue}
                    onChange={handleFocusTodo}
                    style={{ width: '100%' }}
                  />
                  <button
                    style={{
                      background: 'black',
                      color: 'white',
                      cursor: 'pointer',
                      width: '20%',
                    }}
                  >
                    등록
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </HeaderLayout>
    </>
  );
};

const HeaderLayout = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  padding: 1rem;
  border-bottom: 2px solid #5491ed;
`;

const HeaderTitleLayout = styled.div`
  width: 95%;
  padding: 1rem;
  text-align: center;
  color: #555555;
  font-size: 2rem;
`;

const FilterIconLayout = styled.div`
  display: flex;
  justify-content: center;
  width: 5%;
`;

const FilterIcon = styled(filterIcon)`
  width: 2rem;
  height: auto;

  cursor: pointer;
`;

const FilterSection = styled.div<{ opened: boolean }>`
  z-index: 20;
  position: absolute;
  right: 10px;
  top: 10px;
  width: 200px;
  height: 200px;
  background: #fff;
  opacity: ${({ opened }) => (opened ? '1' : '0')};
  visibility: ${({ opened }) => (opened ? 'visible' : 'hidden')};
  border-radius: 5px;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
`;

const Close = styled.button<{ onClick: any }>`
  position: absolute;
  right: 15px;
  top: 15px;
  width: 10px;
  height: 10px;
  cursor: pointer;
`;

export default Header;
