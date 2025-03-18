/*
  # Create user management tables and policies

  1. New Tables
    - `roles`
      - `id` (uuid, primary key)
      - `role_name` (varchar)
      - `description` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `user_types`
      - `id` (uuid, primary key)
      - `name` (varchar)
      - `status` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `users`
      - `id` (uuid, primary key)
      - `user_identifier` (integer, unique)
      - `name` (varchar)
      - `email` (varchar, unique)
      - `mobile` (varchar)
      - `email_verified_at` (timestamptz)
      - `is_mobile_verified` (boolean)
      - `password` (varchar)
      - `role_id` (uuid, references roles)
      - `device_id` (varchar)
      - `device_os` (varchar)
      - `type` (integer)
      - `user_type_id` (uuid, references user_types)
      - `provider_name` (varchar)
      - `provider_id` (text)
      - `remember_token` (varchar)
      - `status` (boolean)
      - `verified` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `user_addresses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `address` (text)
      - `lat` (double precision)
      - `long` (double precision)
      - `type` (varchar)
      - `specifications` (varchar)
      - `is_default` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `user_devices`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `device_id` (varchar)
      - `device_os` (varchar)
      - `fcm_token` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add policy for service role
*/

-- Create roles table
CREATE TABLE roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role_name character varying(100) NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_types table
CREATE TABLE user_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name character varying(200) NOT NULL,
  status boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_identifier integer NOT NULL UNIQUE,
  name character varying(255),
  email character varying(255) NOT NULL UNIQUE,
  mobile character varying(12),
  email_verified_at timestamptz,
  is_mobile_verified boolean DEFAULT false,
  password character varying(255) NOT NULL,
  role_id uuid REFERENCES roles(id),
  device_id character varying(100),
  device_os character varying(10),
  type integer DEFAULT 0,
  user_type_id uuid REFERENCES user_types(id),
  provider_name character varying(100),
  provider_id text,
  remember_token character varying(100),
  status boolean DEFAULT false,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_addresses table
CREATE TABLE user_addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  address text NOT NULL,
  lat double precision NOT NULL,
  long double precision NOT NULL,
  type character varying(11) NOT NULL,
  specifications character varying(255),
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_devices table
CREATE TABLE user_devices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  device_id character varying(250),
  device_os character varying(10),
  fcm_token text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_devices ENABLE ROW LEVEL SECURITY;

-- Create policies for roles
CREATE POLICY "Roles are viewable by authenticated users"
  ON roles
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for user_types
CREATE POLICY "User types are viewable by authenticated users"
  ON user_types
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for users
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create policies for user_addresses
CREATE POLICY "Users can manage their own addresses"
  ON user_addresses
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policies for user_devices
CREATE POLICY "Users can manage their own devices"
  ON user_devices
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Insert default roles
INSERT INTO roles (role_name, description) VALUES
  ('user', 'Regular user'),
  ('admin', 'Administrator'),
  ('manager', 'Manager');

-- Insert default user types
INSERT INTO user_types (name) VALUES
  ('individual', 'Individual user'),
  ('business', 'Business user');