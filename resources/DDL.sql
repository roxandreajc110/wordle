CREATE database wordle;
-- public.games_id_seq definition

-- DROP SEQUENCE public.games_id_seq;

CREATE SEQUENCE public.games_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- public.trace_game_id_game_seq definition

-- DROP SEQUENCE public.trace_game_id_game_seq;

CREATE SEQUENCE public.trace_game_id_game_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- public.trace_game_id_seq definition

-- DROP SEQUENCE public.trace_game_id_seq;

CREATE SEQUENCE public.trace_game_id_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

-- public.words_dictionary definition

-- Drop table

-- DROP TABLE public.words_dictionary;

CREATE TABLE public.words_dictionary (
	word varchar NOT NULL,
	"createdAt" varchar NULL,
	"updatedAt" varchar NULL,
	CONSTRAINT words_dictionary_pk PRIMARY KEY (word)
);

-- public.games definition

-- Drop table

-- DROP TABLE public.games;

CREATE TABLE public.games (
	id serial4 NOT NULL,
	"userId" int8 NOT NULL,
	word varchar NOT NULL,
	status varchar NOT NULL,
	"result" varchar NULL,
	"createdAt" varchar(30) NOT NULL,
	"updatedAt" varchar(30) NULL,
	CONSTRAINT games_pk PRIMARY KEY (id)
);

-- public.games foreign keys

ALTER TABLE public.games ADD CONSTRAINT games_fk FOREIGN KEY (word) REFERENCES public.words_dictionary(word);

-- public.game_traces definition

-- Drop table

-- DROP TABLE public.game_traces;

CREATE TABLE public.game_traces (
	id int4 NOT NULL DEFAULT nextval('trace_game_id_seq'::regclass),
	"idGame" int4 NOT NULL,
	"resultDetail" varchar NOT NULL,
	status varchar NOT NULL,
	word varchar NOT NULL,
	"createdAt" varchar NOT NULL,
	"updatedAt" varchar NULL,
	CONSTRAINT trace_game_pk PRIMARY KEY (id)
);

