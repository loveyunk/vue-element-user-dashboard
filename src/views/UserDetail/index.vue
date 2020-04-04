<template>
  <div>
    <!-- TODO: -->
    {{ user }}
  </div>
</template>

<script>
import { getUser } from '@/services/user';

export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },

  data() {
    return {
      user: {}
    };
  },

  created() {
    this.fetchUserData();
  },

  methods: {
    fetchUserData() {
      getUser(this.id).then(res => {
        this.user = res.data;
      });
    }
  }
};
</script>
