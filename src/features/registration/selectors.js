import { createSelector } from 'reselect'

const emptyObject = {}

const selectState = state => state.registration

const selectForm = createSelector(selectState, substate => substate.form)

// Return a reference to the same object as a fallback
// so the cache of selectors depending on this one won't be invalidated needlessly
const selectFormSection = createSelector(
  selectForm,
  (_, sectionId) => sectionId,
  (form, sectionId) => form[sectionId] || emptyObject
)

// Might be overkill for a simple selector like this, but when there is heavy computation
// composing selectors and accurately managing their cache almost always leads to improved performances.
export const makeSelectFieldValue = (parentId, fieldId) =>
  createSelector(
    state => selectFormSection(state, parentId),
    formSection => formSection[fieldId]
  )
