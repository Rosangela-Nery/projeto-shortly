--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer,
    token text NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: shortens; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.shortens (
    id integer NOT NULL,
    "userId" integer,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer NOT NULL
);


--
-- Name: shortens_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.shortens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: shortens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.shortens_id_seq OWNED BY public.shortens.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(55) NOT NULL,
    password character varying(100) NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: shortens id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortens ALTER COLUMN id SET DEFAULT nextval('public.shortens_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (2, 15, '462da4c3-eebc-4fa7-8cab-37901d05f70c');
INSERT INTO public.sessions VALUES (3, 15, '04d4d7c2-d7c5-4a45-8e43-90d5996ea933');
INSERT INTO public.sessions VALUES (4, 15, '65d38b89-b531-4b19-9f2c-20e06ca63500');
INSERT INTO public.sessions VALUES (5, 16, '8f1729d5-037a-4218-8716-37572ddb343d');
INSERT INTO public.sessions VALUES (6, 16, 'a1fc4548-b6c5-414b-a1de-139bbfdb7028');
INSERT INTO public.sessions VALUES (7, 16, '2df6ba93-f10c-4741-ae5f-eb879b7d5046');
INSERT INTO public.sessions VALUES (8, 15, 'c2c808ac-4194-4ca9-a4f3-beb9bae4468a');
INSERT INTO public.sessions VALUES (9, 15, 'fd7e7178-f12f-42c6-9e87-6b21024e111f');
INSERT INTO public.sessions VALUES (10, 17, '355c5430-0a85-4a59-a5d8-4fe79f2c66d6');


--
-- Data for Name: shortens; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.shortens VALUES (3, 15, 'https://acervolima.com/funcao-express-js-res-redirect/', '1dcdc7cc', 1);
INSERT INTO public.shortens VALUES (7, 16, 'https://acervolima.com/funcao-express-js-res-redirect/', '18d1425c', 2);
INSERT INTO public.shortens VALUES (1, 15, 'https://encrypted-tbn0.gstatic.com', 'ab72fedf', 2);
INSERT INTO public.shortens VALUES (8, 15, 'https://acervolima.com/funcao-express-js-res-redirect/', '2618fca5', 0);
INSERT INTO public.shortens VALUES (9, 17, 'https://acervolima.com/funcao-express-js-res-redirect/', 'bf1eb2c3', 5);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (15, 'tamy', 'tami@gmail.com', '$2b$12$ilJyLtpUjI73krTiyuXUJeFlNQugeA0MmdNc67in/k7C04d80bLUC');
INSERT INTO public.users VALUES (16, 'Rosa', 'rosa@gmail.com', '$2b$12$pT89jcl6CkBacTqH7IKM5.g9zOX8aZOqoSfmn9/8vayHHXwZBqjf.');
INSERT INTO public.users VALUES (17, 'João', 'joao@gmail.com', '$2b$12$OI3e8KrCtRvksVXMLdY3H.Qh7jGiEP99gL0ipnuoFChbvF88.B/da');
INSERT INTO public.users VALUES (18, 'mari', 'mari@gmail.com', '$2b$12$Nh6F4tDXPtelpwE5Oli9revDHnfW9XbEFzs5C2TIhQb8yHbwTHV..');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 10, true);


--
-- Name: shortens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.shortens_id_seq', 9, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 18, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: shortens shortens_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortens
    ADD CONSTRAINT shortens_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: shortens shortens_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.shortens
    ADD CONSTRAINT "shortens_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

