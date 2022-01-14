import { createSelector } from 'reselect'

const selectState = state => state.registration

export const selectForm = createSelector(selectState, substate => substate.form)
