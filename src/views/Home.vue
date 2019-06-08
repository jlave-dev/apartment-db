<template>
  <div class="home container is-flex">
    <section class="section has-text-centered">
      <img
        alt="logo"
        src="@/assets/flat.svg"
        style="width: 150px"
      >
      <h1 class="title is-3">
        Enter an apartment address below.
      </h1>
      <b-autocomplete
        placeholder="e.g. 1433 W Flournoy St"
        :keep-first="true"
        :data="autocompletePrediction"
        :loading="isGettingAddressPredictions"
        field="description"
        @typing="onInputPartialAddress"
        @select="option => selectedAddress = option"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { Bind, Debounce } from 'lodash-decorators';
import { Component, Vue } from 'vue-property-decorator';

type AutocompleteService = google.maps.places.AutocompleteService;
type AutocompletionRequest = google.maps.places.AutocompletionRequest;
type AutocompletePrediction = google.maps.places.AutocompletePrediction
type AsyncPredictionFunction = (req: AutocompletionRequest) => Promise<AutocompletePrediction[]>

@Component
export default class Home extends Vue {
  addressText: string = ''

  autocompletePrediction: AutocompletePrediction[] = []

  autocompleteService: AutocompleteService | null = null

  isGettingAddressPredictions: boolean = false

  selectedAddress: any | null = null

  mounted() {
    try {
      this.autocompleteService = new google.maps.places.AutocompleteService();
    } catch (error) {
      console.error(error);
      this.$snackbar.open({
        type: 'is-warning',
        message: 'Address autocompletion could not be initialized.',
      });
    }
  }

  @Bind()
  @Debounce(1000)
  onInputPartialAddress(input: string) {
    if (this.autocompleteService) {
      this.isGettingAddressPredictions = true;
      this.autocompleteService.getPlacePredictions({
        input,
        types: ['address'],
      },
      (result, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          throw new Error('Could not get address predictions.');
        }
        this.autocompletePrediction = result;
        this.isGettingAddressPredictions = false;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  flex-direction: column;
  align-items: center;
}
</style>
