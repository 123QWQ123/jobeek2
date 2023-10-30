<template>
    <div class="notification">
      <button type="button" @click="notifyMe">Show notification</button>
    </div>
</template>

<script setup>

// const nativeNotification = useNativeNotification()

function notifyMe() {
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    const notification = new Notification("Test notification", {image: "/assets/img/unsplash_QBpZGqEMsKgmini.jpg", data: {redirect_uri: '/profile'}});
    notification.onclick = (e) => {
      console.log(e.srcElement);
      const {data: {redirect_uri}} = e.srcElement;
      console.log(redirect_uri);
      if (redirect_uri){
        navigateTo(redirect_uri);
      }
    }
    // …
  } else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        const notification = new Notification("Hi there!");
        // …
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.
}

</script>
<style scoped></style>
