const PET_LOST_BASE = 'pet-lost-publications';

export const OPERATIONS_PET_LOST = {
  BY_MUNICIPALITY: operationJoin('byMunicipality'),
};

function operationJoin(OPERATION: string) {
  return `${PET_LOST_BASE}/${OPERATION}`;
}
