const PET_ADOPTION_BASE = 'pet-adoption-publications';

export const OPERATIONS_PET_ADOPTION = {
  BY_MUNICIPALITY: operationJoin('byMunicipality'),
};

function operationJoin(OPERATION: string) {
  return `${PET_ADOPTION_BASE}/${OPERATION}`;
}
