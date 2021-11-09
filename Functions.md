# Pseudocode events/functions of the contract

## Events
#### event newSuggestion(city: indexed City, category: indexed Category, poster: indexed Address, id: Int)
#### event suggestionDeleted(id: Int)
#### event suggestionVoted(id: Int, voter: Address)
#### event suggestionTipped(id Int, donor: Address)

## Functions
#### func post suggestion
#### func delete suggestion
#### func vote suggestion (bool)
#### func tip poster (tipAmount) payable

