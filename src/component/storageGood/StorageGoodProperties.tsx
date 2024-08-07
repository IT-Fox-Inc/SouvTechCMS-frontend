import { Badge, Grid } from "@chakra-ui/react"
import { StorageGoodPropertyRow } from "component/storageGood/StorageGoodPropertyRow"
import { FC } from "react"
import { StorageGood } from "type/storageGood"
import { WithId } from "type/withId"

interface StorageGoodPropertiesProps {
  storageGood: WithId<StorageGood>
}

export const StorageGoodProperties: FC<StorageGoodPropertiesProps> = (
  props,
) => {
  const { storageGood } = props

  const storageGoodPropertiesList = [
    // SKU segment
    {
      name: "SKU segment",
      value: (
        <Badge fontSize="sm" colorScheme="blue">
          {storageGood.uniquename}
        </Badge>
      ),
    },
    // Name
    {
      name: "Name",
      value: storageGood.name,
    },
    // Description
    {
      name: "Date",
      value: storageGood.description,
    },
  ]

  return (
    <Grid w="fit-content" templateColumns="repeat(2, 1fr)" gap={5}>
      {storageGoodPropertiesList.map(({ name, value }, index) => (
        <StorageGoodPropertyRow key={index} name={name} value={value} />
      ))}
    </Grid>
  )
}
