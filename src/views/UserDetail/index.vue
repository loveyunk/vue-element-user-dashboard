<template>
  <div>
    <!-- TODO: -->
    {{ user }}
  </div>
</template>

<script>
import UserService from '@/services/UserService';

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
      UserService.getUser(this.id).then(res => {
        this.user = res.data;
      });
    }
  }
};
</script>
