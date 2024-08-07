import { SimpleGrid } from "@chakra-ui/react"
import { getAllSuppliers } from "api/supplier/supplier"
import { LoadingPage } from "component/page/LoadingPage"
import { Page } from "component/page/Page"
import { PageHeading } from "component/page/PageHeading"
import { NewSupplierCard } from "component/supplier/NewSupplierCard"
import { SupplierCard } from "component/supplier/SupplierCard"
import { Role } from "constant/roles"
import { useSearchContext } from "context/search"
import { withAuthAndRoles } from "hook/withAuthAndRoles"
import { useQuery } from "react-query"
import { SupplierWithManagers } from "type/supplier/supplier"

const Suppliers = () => {
  const { query, isQueryExists } = useSearchContext()

  const { data: suppliersList, isLoading } = useQuery<SupplierWithManagers[]>(
    "suppliersWithManagersList",
    getAllSuppliers,
  )

  const filteredSuppliersList = suppliersList?.filter(({ name, address }) =>
    isQueryExists
      ? name.toLowerCase().includes(query.toLowerCase()) ||
        address?.toLowerCase().includes(query.toLowerCase())
      : suppliersList,
  )

  return (
    <Page>
      <PageHeading title="Suppliers" isSearchDisabled={isLoading} />

      {!isLoading ? (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={10}
        >
          <NewSupplierCard />

          {filteredSuppliersList?.map((supplier, index) => (
            <SupplierCard key={index} supplier={supplier} />
          ))}
        </SimpleGrid>
      ) : (
        <LoadingPage />
      )}
    </Page>
  )
}

export default withAuthAndRoles([Role.STORAGER])(Suppliers)
