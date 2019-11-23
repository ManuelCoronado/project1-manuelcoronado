var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Geolocation {
    getCurrentLocation() {
        return __awaiter(this, void 0, void 0, function* () {
            navigator.geolocation.getCurrentPosition(function (pos) {
                var p = document.getElementById("coordinates");
                p.textContent = "Latidude: " + pos.coords.latitude + ". Longitude: " + pos.coords.longitude
                    + " (accuracy: " + pos.coords.accuracy + ")";
            }, function (error) {
                var p = document.getElementById("coordinates");
                switch (error.code) {
                    case error.PERMISSION_DENIED: // User didn't allow the web page to retrieve location
                        p.textContent = "User denied the request for Geolocation.";
                        break;
                    case error.POSITION_UNAVAILABLE: // Couldn't get the location
                        p.textContent = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT: // The maximum amount of time to get location information has passed
                        p.textContent = "The request to get user location timed out.";
                        break;
                }
            });
            return;
        });
    }
}
//# sourceMappingURL=geolocation.class.js.map