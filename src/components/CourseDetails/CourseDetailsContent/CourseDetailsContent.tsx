import Image from 'next/image';
import React, { SyntheticEvent, useState } from 'react';
import * as Styled from './styles';
import { imageLoader } from '../../../utils/imageLoader';
import { Button } from '../../common/Button/Button';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { HiOutlineBookOpen } from 'react-icons/hi';
import IconWithText from '../../common/IconWithText/IconWithText';
import iconDuration from '../../../assets/icon_duration.svg';
import iconResources from '../../../assets/icon_resources.svg';
import iconPractise from '../../../assets/icon_practise.svg';
import iconBook from '../../../assets/icon_book.svg';
import iconCertify from '../../../assets/icon_certify.svg';
import iconPeople from '../../../assets/iconalt_people.svg';
import iconAltDuration from '../../../assets/iconalt_duration.svg';
import iconAltLevel from '../../../assets/iconalt_level.svg';
import iconRefunded from '../../../assets/iconalt_refunded.svg';
import iconAltPlace from '../../../assets/iconalt_place.svg';
import CourseDropdownItem from '../CourseDropdownItem';
import { ErrorText } from '../../common/ErrorText/ErrorText';

const initialState = {
  email: '',
  firstname: '',
  lastname: '',
  phone: '',
  content: '',
};

const CourseDetailsContent = ({
  description,
  dropdowns,
  title,
  thumbnail,
  price,
  duration,
  level,
  vacancies,
  isRefunded,
  voivodeship,
}: any) => {
  const [email, setEmail] = useState<any>(initialState);
  const [errors, setErrors] = useState<any>({});

  const dropdownsContent = dropdowns.html.split('#');
  const dropdownObj = dropdownsContent.map((item: any) => {
    const quotes = item.split('</h4>');
    if (!quotes[0] || !quotes[1]) return;
    return {
      title: quotes[0].replace(/<[^>]+>/g, ''),
      desc: quotes[1].replace(/<[^>]+>/g, ''),
    };
  });

  const validateEmail = (data: any) => {
    const errors: any = {};
    if (data.firstname.length < 2) errors.firstname = 'Imię jest wymagane';
    if (data.lastname.length < 2) errors.lastname = 'Nazwisko jest wymagane';
    if (!data.email.toLowerCase().match(/\S+@\S+\.\S+/)) errors.email = 'Niepoprawny adres email';
    if (data.phone.length < 4) errors.phone = 'Numer telefonu jest wymagany';
    if (Object.keys(errors).length === 0) return true;
    else return errors;
  };

  const sendEmail = async (e: SyntheticEvent) => {
    e.preventDefault();
    const isValid = validateEmail(email);
    if (isValid === true) {
      fetch('/api/email', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(email),
      });
      setEmail(initialState);
      setErrors([]);
      console.log('wysylam');
    } else {
      setErrors(isValid);
    }
  };

  const handleEmail = (e: any) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  return (
    <Styled.Wrapper>
      <Styled.Content>
        <Styled.Overview>
          <div>
            <h3>{title}</h3>
            <h6>Opis kursu</h6>
            <Styled.InnerHTML dangerouslySetInnerHTML={{ __html: description.html }} />
          </div>
          <div>
            <h3>FAQ</h3>
            <Styled.Dropdowns>
              {dropdownObj.map((item: any, index: any) => (
                <CourseDropdownItem item={item} key={index} />
              ))}
            </Styled.Dropdowns>
          </div>

          <Styled.FormBox>
            <h3>Zapisz się na kurs</h3>
            <form onSubmit={(e) => sendEmail(e)}>
              <div>
                <div>
                  <input
                    name='firstname'
                    value={email.firstname}
                    onChange={handleEmail}
                    placeholder='Imię'
                    type='text'
                  />
                  {errors?.firstname && <ErrorText>{errors.firstname}</ErrorText>}
                </div>
                <div>
                <input
                  name='lastname'
                  value={email.lastname}
                  onChange={handleEmail}
                  placeholder='Nazwisko'
                  type='text'
                />
                 {errors?.lastname && <ErrorText>{errors.lastname}</ErrorText>}
                </div>
              </div>
              <div>
                <div>
                <input
                  name='email'
                  value={email.email}
                  onChange={handleEmail}
                  placeholder='Adres Email'
                  type='text'
                />
                   {errors?.email && <ErrorText>{errors.email}</ErrorText>}
                </div>
                <div>
                <input
                  name='phone'
                  value={email.phone}
                  onChange={handleEmail}
                  placeholder='Telefon'
                  type='text'
                />
                 {errors?.phone && <ErrorText>{errors.phone}</ErrorText>}
                </div>
              </div>
              <textarea
                name='content'
                value={email.content}
                onChange={handleEmail}
                placeholder='Wiadomość (opcjonalne)'
                rows={8}
              ></textarea>
              <button type='submit'>Wyślij</button>
            </form>
          </Styled.FormBox>
        </Styled.Overview>
        <Styled.Aside>
          <Styled.AsideBox>
            <Styled.ImageWrapper>
              <Image loader={imageLoader} src={thumbnail.url} layout='fill' objectFit='cover' />
            </Styled.ImageWrapper>
            <Styled.Price>
              Koszt: <span>{price} zł</span>
            </Styled.Price>
            <Styled.Buttons>
              <Button>
                <HiOutlineBookOpen />
                Program
              </Button>
              <Button>
                <AiOutlineShareAlt /> Udostępnij
              </Button>
            </Styled.Buttons>
            <Button>Zapisz się</Button>
          </Styled.AsideBox>
          <Styled.AsideBox>
            <h3>Szczegóły</h3>
            <IconWithText icon={iconPeople} text={`${vacancies} miejsc`} />
            <IconWithText icon={iconAltDuration} text={`${duration} godzin`} />
            <IconWithText icon={iconAltLevel} text={`Poziom ${level}`} />
            <IconWithText icon={iconAltPlace} text={`${voivodeship}`} />
            <IconWithText
              icon={iconRefunded}
              text={`${isRefunded ? 'Dofinansowane' : 'Brak dofinansowania'}`}
            />
          </Styled.AsideBox>
          <Styled.AsideBox>
            <h3>Dodatkowe informacje</h3>
            <IconWithText icon={iconDuration} text={`${duration} godzin zajęć`} />
            <IconWithText icon={iconResources} text={'Materiały szkoleniowe'} />
            <IconWithText icon={iconPractise} text={'Ćwiczenia praktyczne'} />
            <IconWithText icon={iconBook} text={'Najnowsze techniki'} />
            <IconWithText icon={iconCertify} text={'Certyfikat ukończenia'} />
          </Styled.AsideBox>
        </Styled.Aside>
      </Styled.Content>
    </Styled.Wrapper>
  );
};

export default CourseDetailsContent;
