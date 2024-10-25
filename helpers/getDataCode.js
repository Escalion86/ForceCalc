import * as Device from 'expo-device'

const getDataCode = async (code, checkOnly) => {
  let response = await fetch('https://escalion.ru/api/forcecalc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      code,
      data: {
        deviceModelName: Device.modelName,
        deviceModelId: Device.modelId,
        deviceProductName: Device.productName,
        deviceManufacturer: Device.manufacturer,
        deviceBrand: Device.brand,
      },
      checkOnly,
    }),
  })
  const json = await response.json()
  console.log('json :>> ', json)
  return json
}

export default getDataCode
