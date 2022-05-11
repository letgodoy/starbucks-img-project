import { IAddress } from "@types"

export const getAddressByCep = async (cep: string): Promise<IAddress> => {
  
  // const resultCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
  const resultCep = await fetch(`https://ws.apicep.com/cep/${cep}.json`)

  const address = await resultCep.json()

  const response = {
    bairro: address.district,
    cep: address.code,
    localidade: address.city,
    logradouro: address.address,
    uf: address.state,
  }

  return response
}